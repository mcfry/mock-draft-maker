class Api::V1::PlayersController < ApplicationController
  def index
    players = Player.all.order(:projected, :last, :first)
    render json: players.to_json(methods: [:full_name])
  end

  def create
  end

  def show
    
  end

  def destroy
  end

  private
end
