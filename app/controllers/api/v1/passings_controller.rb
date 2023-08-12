class Api::V1::PassingsController < ApplicationController
    def statistics
        stats = Rails.cache.fetch('passing_statistics') do 
            statistics_hash = Hash.new
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
end