import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks';
import { useNotifications } from '../hooks/useNotifications';

const ReviewSystem = ({ productId, productName }) => {
  const { user } = useAuth();
  const { showSuccess, showError, showWarning } = useNotifications();
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [sortBy, setSortBy] = useState('recent'); // recent, helpful, rating

  // Estado del formulario
  const [formData, setFormData] = useState({
    rating: 5,
    title: '',
    comment: '',
    pros: '',
    cons: '',
    recommend: true
  });

  // Cargar reviews del producto
  useEffect(() => {
    loadReviews();
  }, [productId]);

  const loadReviews = async () => {
    try {
      // Simular carga desde Supabase
      const mockReviews = [
        {
          id: 1,
          userId: 'user1',
          userName: 'Carlos M.',
          rating: 5,
          title: 'Excelente calidad',
          comment: 'Las zapatillas son muy cómodas y de excelente calidad. Las recomiendo totalmente.',
          pros: 'Cómodas, duraderas, buen diseño',
          cons: 'Precio algo elevado',
          recommend: true,
          helpful: 12,
          createdAt: '2024-01-15T10:30:00Z',
          verified: true
        },
        {
          id: 2,
          userId: 'user2',
          userName: 'Ana L.',
          rating: 4,
          title: 'Buenas pero podrían mejorar',
          comment: 'Son buenas zapatillas, pero el material podría ser un poco más resistente.',
          pros: 'Buen diseño, cómodas',
          cons: 'Material podría ser más resistente',
          recommend: true,
          helpful: 8,
          createdAt: '2024-01-10T14:20:00Z',
          verified: true
        },
        {
          id: 3,
          userId: 'user3',
          userName: 'Miguel R.',
          rating: 5,
          title: 'Super recomendadas',
          comment: 'Compré estas zapatillas hace 3 meses y están como nuevas. Excelente inversión.',
          pros: 'Duraderas, cómodas, buen precio',
          cons: 'Ninguna',
          recommend: true,
          helpful: 15,
          createdAt: '2024-01-05T09:15:00Z',
          verified: false
        }
      ];

      setReviews(mockReviews);
      
      // Verificar si el usuario ya tiene una review
      if (user) {
        const existingReview = mockReviews.find(review => review.userId === user.id);
        if (existingReview) {
          setUserReview(existingReview);
        }
      }
    } catch (error) {
      console.error('Error cargando reviews:', error);
      showError('Error al cargar las reseñas');
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    if (!user) {
      showWarning('Debes iniciar sesión para escribir una reseña');
      return;
    }

    if (!formData.title.trim() || !formData.comment.trim()) {
      showError('Por favor completa todos los campos requeridos');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simular envío a Supabase
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newReview = {
        id: Date.now(),
        userId: user.id,
        userName: user.nombres || user.email,
        rating: formData.rating,
        title: formData.title,
        comment: formData.comment,
        pros: formData.pros,
        cons: formData.cons,
        recommend: formData.recommend,
        helpful: 0,
        createdAt: new Date().toISOString(),
        verified: true
      };

      setReviews(prev => [newReview, ...prev]);
      setUserReview(newReview);
      setShowReviewForm(false);
      setFormData({
        rating: 5,
        title: '',
        comment: '',
        pros: '',
        cons: '',
        recommend: true
      });

      showSuccess('¡Tu reseña ha sido publicada exitosamente!');
    } catch (error) {
      console.error('Error enviando review:', error);
      showError('Error al publicar la reseña');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleHelpful = (reviewId) => {
    setReviews(prev => 
      prev.map(review => 
        review.id === reviewId 
          ? { ...review, helpful: review.helpful + 1 }
          : review
      )
    );
    showSuccess('Gracias por tu feedback');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating]++;
    });
    return distribution;
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case 'helpful':
        return b.helpful - a.helpful;
      case 'rating':
        return b.rating - a.rating;
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-neutral-800">
          Reseñas de {productName}
        </h3>
        {user && !userReview && (
          <button
            onClick={() => setShowReviewForm(true)}
            className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors"
          >
            Escribir Reseña
          </button>
        )}
      </div>

      {/* Rating Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Average Rating */}
        <div className="text-center">
          <div className="text-4xl font-bold text-neutral-800 mb-2">
            {getAverageRating()}
          </div>
          <div className="flex justify-center mb-2">
            {renderStars(Math.round(getAverageRating()))}
          </div>
          <div className="text-sm text-neutral-600">
            {reviews.length} reseña{reviews.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="col-span-2">
          {Object.entries(getRatingDistribution()).reverse().map(([rating, count]) => (
            <div key={rating} className="flex items-center mb-2">
              <span className="text-sm text-neutral-600 w-8">{rating}★</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2 mx-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{ width: `${reviews.length > 0 ? (count / reviews.length) * 100 : 0}%` }}
                ></div>
              </div>
              <span className="text-sm text-neutral-600 w-8">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="bg-neutral-50 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold mb-4">Escribe tu reseña</h4>
          <form onSubmit={handleSubmitReview}>
            {/* Rating */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Calificación
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                    className="focus:outline-none"
                  >
                    <svg
                      className={`w-8 h-8 ${star <= formData.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Título *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                placeholder="Resume tu experiencia"
                required
              />
            </div>

            {/* Comment */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Comentario *
              </label>
              <textarea
                value={formData.comment}
                onChange={(e) => setFormData(prev => ({ ...prev, comment: e.target.value }))}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                rows="4"
                placeholder="Comparte tu experiencia con este producto"
                required
              ></textarea>
            </div>

            {/* Pros and Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Pros
                </label>
                <input
                  type="text"
                  value={formData.pros}
                  onChange={(e) => setFormData(prev => ({ ...prev, pros: e.target.value }))}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="Lo que más te gustó"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Contras
                </label>
                <input
                  type="text"
                  value={formData.cons}
                  onChange={(e) => setFormData(prev => ({ ...prev, cons: e.target.value }))}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  placeholder="Lo que menos te gustó"
                />
              </div>
            </div>

            {/* Recommend */}
            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.recommend}
                  onChange={(e) => setFormData(prev => ({ ...prev, recommend: e.target.checked }))}
                  className="mr-2"
                />
                <span className="text-sm text-neutral-700">
                  Recomendaría este producto
                </span>
              </label>
            </div>

            {/* Submit Buttons */}
            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Publicando...' : 'Publicar Reseña'}
              </button>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="px-6 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Sort Options */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-neutral-800">
          Todas las reseñas ({reviews.length})
        </h4>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-1 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        >
          <option value="recent">Más recientes</option>
          <option value="helpful">Más útiles</option>
          <option value="rating">Mejor calificadas</option>
        </select>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {sortedReviews.map((review) => (
          <div key={review.id} className="border-b border-neutral-200 pb-6 last:border-b-0">
            {/* Review Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                  <span className="text-cyan-600 font-semibold">
                    {review.userName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-neutral-800">
                    {review.userName}
                    {review.verified && (
                      <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Verificado
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {renderStars(review.rating)}
                    <span className="text-sm text-neutral-600">
                      {formatDate(review.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
              {review.recommend && (
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  Recomendado
                </span>
              )}
            </div>

            {/* Review Content */}
            <div className="mb-3">
              <h5 className="font-semibold text-neutral-800 mb-2">{review.title}</h5>
              <p className="text-neutral-700 mb-3">{review.comment}</p>
              
              {/* Pros and Cons */}
              {(review.pros || review.cons) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  {review.pros && (
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="text-sm font-medium text-green-800 mb-1">Pros:</div>
                      <div className="text-sm text-green-700">{review.pros}</div>
                    </div>
                  )}
                  {review.cons && (
                    <div className="bg-red-50 p-3 rounded-lg">
                      <div className="text-sm font-medium text-red-800 mb-1">Contras:</div>
                      <div className="text-sm text-red-700">{review.cons}</div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Review Actions */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleHelpful(review.id)}
                className="flex items-center space-x-1 text-sm text-neutral-600 hover:text-cyan-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
                <span>Útil ({review.helpful})</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {reviews.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-neutral-800 mb-2">No hay reseñas aún</h3>
          <p className="text-neutral-600">Sé el primero en compartir tu experiencia con este producto</p>
        </div>
      )}
    </div>
  );
};

export default ReviewSystem; 