Rails.application.routes.draw do
  root 'frontend#index'

  devise_for :users

  resources :kkbs, :only => [:new, :create, :edit, :update]

  scope :api do
    get 'users/autocomplete'
    resources :users
    resources :groups
    get 'kkbs/all'
    resources :kkbs, :only => [:index, :show]
  end

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get 'kkbs(/*path)', to: 'frontend#index'
  get 'users(/*path)', to: 'frontend#index'
  get 'groups(/*path)', to: 'frontend#index'
end
