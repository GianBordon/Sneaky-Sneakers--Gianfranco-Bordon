import supabaseService from './supabaseService';

export class ReviewService {
  static TABLE_NAME = 'reviews';

  // Obtener todas las reviews de un producto
  static async getProductReviews(productId) {
    try {
      const { data, error } = await supabaseService.supabase
        .from(this.TABLE_NAME)
        .select(`
          *,
          users:user_id (
            id,
            nombres,
            email
          )
        `)
        .eq('product_id', productId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching reviews:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error in getProductReviews:', error);
      throw error;
    }
  }

  // Crear una nueva review
  static async createReview(reviewData) {
    try {
      const { data, error } = await supabaseService.supabase
        .from(this.TABLE_NAME)
        .insert([{
          product_id: reviewData.productId,
          user_id: reviewData.userId,
          rating: reviewData.rating,
          title: reviewData.title,
          comment: reviewData.comment,
          pros: reviewData.pros,
          cons: reviewData.cons,
          recommend: reviewData.recommend,
          helpful_count: 0,
          verified: true
        }])
        .select()
        .single();

      if (error) {
        console.error('Error creating review:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error in createReview:', error);
      throw error;
    }
  }

  // Actualizar una review existente
  static async updateReview(reviewId, updateData) {
    try {
      const { data, error } = await supabaseService.supabase
        .from(this.TABLE_NAME)
        .update({
          rating: updateData.rating,
          title: updateData.title,
          comment: updateData.comment,
          pros: updateData.pros,
          cons: updateData.cons,
          recommend: updateData.recommend,
          updated_at: new Date().toISOString()
        })
        .eq('id', reviewId)
        .select()
        .single();

      if (error) {
        console.error('Error updating review:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error in updateReview:', error);
      throw error;
    }
  }

  // Eliminar una review
  static async deleteReview(reviewId) {
    try {
      const { error } = await supabaseService.supabase
        .from(this.TABLE_NAME)
        .delete()
        .eq('id', reviewId);

      if (error) {
        console.error('Error deleting review:', error);
        throw error;
      }

      return true;
    } catch (error) {
      console.error('Error in deleteReview:', error);
      throw error;
    }
  }

  // Marcar una review como útil
  static async markHelpful(reviewId) {
    try {
      const { data, error } = await supabaseService.supabase
        .from(this.TABLE_NAME)
        .update({
          helpful_count: supabaseService.supabase.rpc('increment', { row_id: reviewId, column_name: 'helpful_count' })
        })
        .eq('id', reviewId)
        .select()
        .single();

      if (error) {
        console.error('Error marking review as helpful:', error);
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error in markHelpful:', error);
      throw error;
    }
  }

  // Verificar si un usuario ya tiene una review para un producto
  static async getUserReview(productId, userId) {
    try {
      const { data, error } = await supabaseService.supabase
        .from(this.TABLE_NAME)
        .select('*')
        .eq('product_id', productId)
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user review:', error);
        throw error;
      }

      return data || null;
    } catch (error) {
      console.error('Error in getUserReview:', error);
      throw error;
    }
  }

  // Obtener estadísticas de reviews de un producto
  static async getProductReviewStats(productId) {
    try {
      const { data, error } = await supabaseService.supabase
        .from(this.TABLE_NAME)
        .select('rating, helpful_count')
        .eq('product_id', productId);

      if (error) {
        console.error('Error fetching review stats:', error);
        throw error;
      }

      if (!data || data.length === 0) {
        return {
          averageRating: 0,
          totalReviews: 0,
          ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
          totalHelpful: 0
        };
      }

      const totalReviews = data.length;
      const averageRating = data.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
      const totalHelpful = data.reduce((sum, review) => sum + (review.helpful_count || 0), 0);

      const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      data.forEach(review => {
        ratingDistribution[review.rating]++;
      });

      return {
        averageRating: parseFloat(averageRating.toFixed(1)),
        totalReviews,
        ratingDistribution,
        totalHelpful
      };
    } catch (error) {
      console.error('Error in getProductReviewStats:', error);
      throw error;
    }
  }

  // Obtener reviews más útiles de un producto
  static async getMostHelpfulReviews(productId, limit = 5) {
    try {
      const { data, error } = await supabaseService.supabase
        .from(this.TABLE_NAME)
        .select(`
          *,
          users:user_id (
            id,
            nombres,
            email
          )
        `)
        .eq('product_id', productId)
        .order('helpful_count', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error fetching helpful reviews:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error in getMostHelpfulReviews:', error);
      throw error;
    }
  }

  // Obtener reviews recientes de un producto
  static async getRecentReviews(productId, limit = 10) {
    try {
      const { data, error } = await supabaseService.supabase
        .from(this.TABLE_NAME)
        .select(`
          *,
          users:user_id (
            id,
            nombres,
            email
          )
        `)
        .eq('product_id', productId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) {
        console.error('Error fetching recent reviews:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error in getRecentReviews:', error);
      throw error;
    }
  }

  // Obtener todas las reviews de un usuario
  static async getUserReviews(userId) {
    try {
      const { data, error } = await supabaseService.supabase
        .from(this.TABLE_NAME)
        .select(`
          *,
          products:product_id (
            id,
            name,
            image,
            price
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching user reviews:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error in getUserReviews:', error);
      throw error;
    }
  }
} 