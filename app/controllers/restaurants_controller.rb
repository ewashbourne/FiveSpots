class RestaurantsController < ApplicationController

  # def index 
  #   @restaurants = Restaurant.search(params[:location])
  #   render json: @restaurants
  # end

  def show
    @restaurants = Restaurant.search(params[:location])
    render json: @restaurants
  end
 
end