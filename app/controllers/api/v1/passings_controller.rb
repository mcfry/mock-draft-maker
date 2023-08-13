class Api::V1::PassingsController < ApplicationController
    def statistics
        stats = Rails.cache.fetch('passing_statistics', expires_in: 12.hours) do 
            statistics_hash = Hash.new
            statistics_hash[:top_20_attempts] = Passing.top_20_attempts
            statistics_hash[:top_20_completions] = Passing.top_20_completions
            statistics_hash[:top_20_yards] = Passing.top_20_yards
            statistics_hash[:top_20_tds] = Passing.top_20_tds
            statistics_hash[:top_20_long] = Passing.top_20_long
            statistics_hash[:top_20_rating] = Passing.top_20_rating
            statistics_hash[:top_20_interceptions] = Passing.top_20_interceptions
            statistics_hash[:top_20_sacked] = Passing.top_20_sacked
            statistics_hash[:top_20_yards_per_attempt] = Passing.top_20_yards_per_attempt
            statistics_hash[:top_20_completion_percent] = Passing.top_20_completion_percent

            statistics_hash
        end

        render json: stats
    end

    def statistics_by_position
        position = statistics_params[:position]

        if position
            stats = Rails.cache.fetch("passing_statistics_#{position}", expires_in: 12.hours) do 
                statistics_hash = Hash.new
                statistics_hash[:top_20_attempts] = Passing.top_20_attempts(position)
                statistics_hash[:top_20_completions] = Passing.top_20_completions(position)
                statistics_hash[:top_20_yards] = Passing.top_20_yards(position)
                statistics_hash[:top_20_tds] = Passing.top_20_tds(position)
                statistics_hash[:top_20_long] = Passing.top_20_long(position)
                statistics_hash[:top_20_rating] = Passing.top_20_rating(position)
                statistics_hash[:top_20_interceptions] = Passing.top_20_interceptions(position)
                statistics_hash[:top_20_sacked] = Passing.top_20_sacked(position)
                statistics_hash[:top_20_yards_per_attempt] = Passing.top_20_yards_per_attempt(position)
                statistics_hash[:top_20_completion_percent] = Passing.top_20_completion_percent(position)

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