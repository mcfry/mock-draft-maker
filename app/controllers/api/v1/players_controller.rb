class Api::V1::PlayersController < ApplicationController
  def index
    players = Player.includes(:passing, :rushing, :receiving).all.order(:projected, :last, :first)

    render json: players.to_json(methods: [:full_name, :passing, :rushing, :receiving, :total])
  end

  def create
  end

  def show
    
  end

  def destroy
  end

  private
end
