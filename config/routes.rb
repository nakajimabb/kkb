Rails.application.routes.draw do
  root 'frontend#index'

  devise_for :users
  resources :users
  resources :groups

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '*path', to: 'frontend#index'
end
