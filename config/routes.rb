Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'draft_records/index'
      get 'draft_records/create'
      get 'draft_records/show'
      get 'draft_records/destroy'
      get 'players/index'
      post 'players/create'
      get 'players/show/:id', to: 'players#show'
      delete 'players/destroy'
      get 'picks/index'
      post 'picks/create'
      get 'picks/show:id', to: 'picks#show'
      delete 'picks/destroy'
      get 'teams/index'
      post 'teams/create'
      get 'teams/show/:id', to: 'teams#show'
      delete 'teams/destroy'
      post 'draft_records/create'
      get 'draft_records/show/:uuid', to: 'draft_records#show'
    end
  end

  root 'homepage#index'
  get '/*path' => 'homepage#index' # send any request that doesn't match to front end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
end
