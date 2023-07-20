class Api::V1::TeamsController < ApplicationController
  def index
    teams = Team.all.order(:city, :name)
    render json: teams.to_json(methods: [:full_name])
  end

  def create
  end

  def show
  end

  def destroy
  end
end
