class Api::V1::RushingsController < ApplicationController
    def statistics
        stats = Rails.cache.fetch('rushing_statistics', expires_in: 12.hours) do 
            statistics_hash = Hash.new
            statistics_hash[:top_20_yards] = Rushing.top_20_yards
            statistics_hash[:top_20_tds] = Rushing.top_20_tds
            statistics_hash[:top_20_long] = Rushing.top_20_long
            statistics_hash[:top_20_attempts] = Rushing.top_20_attempts
            statistics_hash[:top_20_average] = Rushing.top_20_average

            statistics_hash
        end

        render json: stats
    end

    def statistics_by_position
        position = statistics_params[:position]

        if position
            stats = Rails.cache.fetch("rushing_statistics_#{position}", expires_in: 12.hours) do 
                statistics_hash = Hash.new
                statistics_hash[:top_20_yards] = Rushing.top_20_yards(position)
                statistics_hash[:top_20_tds] = Rushing.top_20_tds(position)
                statistics_hash[:top_20_long] = Rushing.top_20_long(position)
                statistics_hash[:top_20_attempts] = Rushing.top_20_attempts(position)
                statistics_hash[:top_20_average] = Rushing.top_20_average(position)

                statistics_hash
            end

            render json: stats
        else
            render json: {
				message: 'Must include a position.'
			}.to_json, status: :bad_request
        end
    end

    private

        def statistics_params
            params.permit(:position)
        end
end