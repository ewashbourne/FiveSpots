class RestaurantsController < ApplicationController

  def index 
    @restaurants = Restaurant.search
    render json: @restaurants
  end
 
end