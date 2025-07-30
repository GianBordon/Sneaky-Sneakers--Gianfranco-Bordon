import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks';

const ReviewSystem = ({ productId, productName }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    comment: '',
    pros: '',
    cons: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Simular cargar reviews desde localStorage
  useEffect(() => {
    const savedReviews = localStorage.getItem(`reviews_${productId}`);
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, [productId]);

  const saveReviews = (newReviews) => {
    localStorage.setItem(`reviews_${productId}`, JSON.stringify(newReviews));
    setReviews(newReviews);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Debes iniciar sesión para dejar una review');
      return;
    }

    setIsSubmitting(true);
    
    // Simular envío a servidor
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const review = {
      id: Date.now(),
      productId,
      userId: user.id,
      userName: user.nombres,
      userEmail: user.email,
      rating: newReview.rating,
      title: newReview.title,
      comment: newReview.comment,
      pros: newReview.pros,
      cons: newReview.cons,
      date: new Date().toISOString(),
      helpful: 0,
      verified: true
    };

    const updatedReviews = [review, ...reviews];
    saveReviews(updatedReviews);
    
    setNewReview({
      rating: 5,
      title: '',
      comment: '',
      pros: '',
      cons: ''
    });
    setShowReviewForm(false);
    setIsSubmitting(false);
  };

  const handleHelpful = (reviewId) => {
    const updatedReviews = reviews.map(review => 
      review.id === reviewId 
        ? { ...review, helpful: review.helpful + 1 }
        : review
    );
    saveReviews(updatedReviews);
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">Reviews de {productName}</h3>
          <div className="flex items-center mt-2">
            <div className="flex items-center">
              {renderStars(Math.round(averageRating))}
              <span className="ml-2 text-lg font-semibold text-gray-700">
                {averageRating.toFixed(1)}
              </span>
            </div>
            <span className="ml-2 text-gray-500">({reviews.length} reviews)</span>
          </div>
        </div>
        
        {user && (
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors"
          >
            {showReviewForm ? 'Cancelar' : 'Escribir Review'}
          </button>
        )}
      </div>

      {/* Formulario de Review */}
      {showReviewForm && (
        <form onSubmit={handleSubmitReview} className="mb-8 p-6 bg-gray-50 rounded-lg">
          <h4 className="text-lg font-semibold mb-4">Tu Review</h4>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Calificación
            </label>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                  className="focus:outline-none"
                >
                  <svg
                    className={`w-8 h-8 ${star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título
            </label>
            <input
              type="text"
              value={newReview.title}
              onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              placeholder="Resumen de tu experiencia"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Comentario
            </label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
              rows="4"
              placeholder="Comparte tu experiencia con este producto"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pros
              </label>
              <input
                type="text"
                value={newReview.pros}
                onChange={(e) => setNewReview({ ...newReview, pros: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Lo que más te gustó"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contras
              </label>
              <input
                type="text"
                value={newReview.cons}
                onChange={(e) => setNewReview({ ...newReview, cons: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Lo que menos te gustó"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Enviando...' : 'Publicar Review'}
          </button>
        </form>
      )}

      {/* Lista de Reviews */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No hay reviews aún. ¡Sé el primero en opinar!</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-cyan-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {review.userName.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-3">
                    <div className="flex items-center">
                      <span className="font-semibold text-gray-800">{review.userName}</span>
                      {review.verified && (
                        <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Verificado
                        </span>
                      )}
                    </div>
                    <div className="flex items-center mt-1">
                      {renderStars(review.rating)}
                      <span className="ml-2 text-sm text-gray-500">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="font-semibold text-gray-800 mb-2">{review.title}</h4>
                <p className="text-gray-600 mb-3">{review.comment}</p>
                
                {(review.pros || review.cons) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    {review.pros && (
                      <div className="bg-green-50 p-3 rounded-lg">
                        <span className="font-semibold text-green-800">Pros:</span>
                        <p className="text-green-700 mt-1">{review.pros}</p>
                      </div>
                    )}
                    {review.cons && (
                      <div className="bg-red-50 p-3 rounded-lg">
                        <span className="font-semibold text-red-800">Contras:</span>
                        <p className="text-red-700 mt-1">{review.cons}</p>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="mt-3">
                  <button
                    onClick={() => handleHelpful(review.id)}
                    className="text-sm text-gray-500 hover:text-cyan-600 transition-colors"
                  >
                    👍 Útil ({review.helpful})
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewSystem; 