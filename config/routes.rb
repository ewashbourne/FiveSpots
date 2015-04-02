Rails.application.routes.draw do
  scope '/api' do
    resources :reviews, except: [:new, :edit]
    # resources :restaurants, only: :show
    get '/restaurants', to: 'restaurants#show', as: 'restaurant'
  end
end
