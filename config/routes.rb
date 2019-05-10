Rails.application.routes.draw do
  root 'frontend#index'

  devise_for :users

  resources :kkbs, :only => [:new, :create, :edit, :update]

  scope :api do
    resources :users
    resources :groups
    resources :kkbs, :only => [:index, :show]
    get '/kkbs/all'
  end

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '*path', to: 'frontend#index'
end
