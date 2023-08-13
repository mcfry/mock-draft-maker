class Passing < ApplicationRecord
    belongs_to :player

    attr_accessor :completion_percent, :yards_per_attempt

    def completion_percent
        (completions.to_f / attempts.to_f).round(2)
    end

    def yards_per_attempt
        (yards.to_f / attempts.to_f).round(2)
    end

    def self.top_20_attempts
        sum_and_average_20(all.order(attempts: :desc).limit(20).pluck(:attempts))
    end

    def self.top_20_completions
        sum_and_average_20(all.order(completions: :desc).limit(20).pluck(:completions))
    end

    def self.top_20_yards
        sum_and_average_20(all.order(yards: :desc).limit(20).pluck(:yards))
    end

    def self.top_20_tds
        sum_and_average_20(all.order(touchdowns: :desc).limit(20).pluck(:touchdowns))
    end

    def self.top_20_long
        sum_and_average_20(all.order(long: :desc).limit(20).pluck(:long))
    end

    def self.top_20_rating
        sum_and_average_20(where("completions > ?", 100).order(rating: :desc).limit(20).pluck(:rating))
    end

    def self.top_20_interceptions
        sum_and_average_20(all.order(interceptions: :desc).limit(20).pluck(:interceptions))
    end

    def self.top_20_sacked
        sum_and_average_20(all.order(sacked: :desc).limit(20).pluck(:sacked))
    end

    def self.top_20_yards_per_attempt
        sum_and_average_20(where("completions > ?", 100).sort_by{|passing|
            passing.yards_per_attempt.nan? ? 0.0 : passing.yards_per_attempt
        }.reverse.take(20).map{ |passing| 
            passing.yards_per_attempt
        })
    end

    def self.top_20_completion_percent
        sum_and_average_20(where("completions > ?", 100).sort_by { |passing| 
            passing.completion_percent.nan? ? 0.0 : passing.completion_percent
        }.reverse.take(20).map{ |passing| 
            passing.completion_percent
        })
    end

    def as_json(options = {})
        super(options).merge(completion_percent: completion_percent, yards_per_attempt: yards_per_attempt)
    end

    private

    def self.sum_and_average_20(array)
        (array.inject(0){ |total, cur| 
            total + cur
        }.to_f / 20).round(2)
    end
end
