import { useState, useEffect, useCallback } from 'react';
import { ReviewService } from '../services/reviewService';
import { useNotifications } from './useNotifications';

export const useReviews = (productId) => {
  const { showSuccess, showError, showWarning } = useNotifications();
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState(null);
  const [stats, setStats] = useState({
    averageRating: 0,
    totalReviews: 0,
    ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    totalHelpful: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Cargar reviews del producto
  const loadReviews = useCallback(async () => {
    if (!productId) return;

    setIsLoading(true);
    try {
      const [reviewsData, statsData] = await Promise.all([
        ReviewService.getProductReviews(productId),
        ReviewService.getProductReviewStats(productId)
      ]);

      setReviews(reviewsData);
      setStats(statsData);
    } catch (error) {
      console.error('Error loading reviews:', error);
      showError('Error al cargar las reseñas');
    } finally {
      setIsLoading(false);
    }
  }, [productId, showError]);

  // Cargar reviews al montar el componente o cambiar el producto
  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  // Verificar si el usuario ya tiene una review
  const checkUserReview = useCallback(async (userId) => {
    if (!productId || !userId) return;

    try {
      const existingReview = await ReviewService.getUserReview(productId, userId);
      setUserReview(existingReview);
    } catch (error) {
      console.error('Error checking user review:', error);
    }
  }, [productId]);

  // Crear una nueva review
  const createReview = useCallback(async (reviewData) => {
    if (!productId) {
      showError('ID de producto no válido');
      return null;
    }

    setIsSubmitting(true);
    try {
      const newReview = await ReviewService.createReview({
        ...reviewData,
        productId
      });

      // Actualizar la lista de reviews
      setReviews(prev => [newReview, ...prev]);
      setUserReview(newReview);

      // Actualizar estadísticas
      const newStats = await ReviewService.getProductReviewStats(productId);
      setStats(newStats);

      showSuccess('¡Tu reseña ha sido publicada exitosamente!');
      return newReview;
    } catch (error) {
      console.error('Error creating review:', error);
      showError('Error al publicar la reseña');
      return null;
    } finally {
      setIsSubmitting(false);
    }
  }, [productId, showSuccess, showError]);

  // Actualizar una review existente
  const updateReview = useCallback(async (reviewId, updateData) => {
    setIsSubmitting(true);
    try {
      const updatedReview = await ReviewService.updateReview(reviewId, updateData);

      // Actualizar la lista de reviews
      setReviews(prev => 
        prev.map(review => 
          review.id === reviewId ? updatedReview : review
        )
      );
      setUserReview(updatedReview);

      // Actualizar estadísticas
      const newStats = await ReviewService.getProductReviewStats(productId);
      setStats(newStats);

      showSuccess('Reseña actualizada exitosamente');
      return updatedReview;
    } catch (error) {
      console.error('Error updating review:', error);
      showError('Error al actualizar la reseña');
      return null;
    } finally {
      setIsSubmitting(false);
    }
  }, [productId, showSuccess, showError]);

  // Eliminar una review
  const deleteReview = useCallback(async (reviewId) => {
    try {
      await ReviewService.deleteReview(reviewId);

      // Actualizar la lista de reviews
      setReviews(prev => prev.filter(review => review.id !== reviewId));
      setUserReview(null);

      // Actualizar estadísticas
      const newStats = await ReviewService.getProductReviewStats(productId);
      setStats(newStats);

      showSuccess('Reseña eliminada exitosamente');
      return true;
    } catch (error) {
      console.error('Error deleting review:', error);
      showError('Error al eliminar la reseña');
      return false;
    }
  }, [productId, showSuccess, showError]);

  // Marcar una review como útil
  const markHelpful = useCallback(async (reviewId) => {
    try {
      const updatedReview = await ReviewService.markHelpful(reviewId);

      // Actualizar la review en la lista
      setReviews(prev => 
        prev.map(review => 
          review.id === reviewId ? updatedReview : review
        )
      );

      showSuccess('Gracias por tu feedback');
      return updatedReview;
    } catch (error) {
      console.error('Error marking review as helpful:', error);
      showError('Error al marcar la reseña como útil');
      return null;
    }
  }, [showSuccess, showError]);

  // Obtener reviews más útiles
  const getMostHelpfulReviews = useCallback(async (limit = 5) => {
    try {
      const helpfulReviews = await ReviewService.getMostHelpfulReviews(productId, limit);
      return helpfulReviews;
    } catch (error) {
      console.error('Error fetching helpful reviews:', error);
      return [];
    }
  }, [productId]);

  // Obtener reviews recientes
  const getRecentReviews = useCallback(async (limit = 10) => {
    try {
      const recentReviews = await ReviewService.getRecentReviews(productId, limit);
      return recentReviews;
    } catch (error) {
      console.error('Error fetching recent reviews:', error);
      return [];
    }
  }, [productId]);

  // Ordenar reviews
  const sortReviews = useCallback((sortBy) => {
    const sortedReviews = [...reviews];
    
    switch (sortBy) {
      case 'helpful':
        sortedReviews.sort((a, b) => (b.helpful_count || 0) - (a.helpful_count || 0));
        break;
      case 'rating':
        sortedReviews.sort((a, b) => b.rating - a.rating);
        break;
      case 'recent':
      default:
        sortedReviews.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
    }

    return sortedReviews;
  }, [reviews]);

  // Verificar si el usuario puede escribir una review
  const canWriteReview = useCallback((userId) => {
    if (!userId) return false;
    return !userReview;
  }, [userReview]);

  // Obtener el promedio de calificación
  const getAverageRating = useCallback(() => {
    return stats.averageRating;
  }, [stats.averageRating]);

  // Obtener la distribución de calificaciones
  const getRatingDistribution = useCallback(() => {
    return stats.ratingDistribution;
  }, [stats.ratingDistribution]);

  return {
    // Estado
    reviews,
    userReview,
    stats,
    isLoading,
    isSubmitting,

    // Acciones
    loadReviews,
    checkUserReview,
    createReview,
    updateReview,
    deleteReview,
    markHelpful,
    getMostHelpfulReviews,
    getRecentReviews,
    sortReviews,

    // Utilidades
    canWriteReview,
    getAverageRating,
    getRatingDistribution
  };
}; 