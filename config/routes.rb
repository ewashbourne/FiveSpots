Rails.application.routes.draw do
  scope '/api' do
    resources :reviews, except: [:new, :edit]
    resources :restaurants, only: :index
  end



end
