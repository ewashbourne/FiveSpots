class AddRestaurantIdToReviews < ActiveRecord::Migration
  def change
    add_column :reviews, :restaurant_id, :string
  end
end
