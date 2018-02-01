Rails.application.routes.draw do
  resources :users
  resources :lectures, only: [:index, :new, :create, :destroy]
  resources :researchs, only: [:index, :new, :create, :destroy]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
