class Passing < ApplicationRecord
    belongs_to :player

    scope :by_position, -> (position) { joins(:player).where({player: {position: position}}) }

    attr_accessor :completion_percent, :yards_per_attempt

    def completion_percent
        (completions.to_f / attempts.to_f).round(2)
    end

    def yards_per_attempt
        (yards.to_f / attempts.to_f).round(2)
    end

    def self.top_20_attempts(position = nil)
        if position.nil?
            sum_and_average_20(all.order(attempts: :desc).limit(20).pluck(:attempts))
        else
            sum_and_average_20(by_position(position).order(attempts: :desc).limit(20).pluck(:attempts))
        end
    end

    def self.top_20_completions(position = nil)
        if position.nil?
            sum_and_average_20(all.order(completions: :desc).limit(20).pluck(:completions))
        else
            sum_and_average_20(by_position(position).order(completions: :desc).limit(20).pluck(:completions))
        end
    end

    def self.top_20_yards(position = nil)
        if position.nil?
            sum_and_average_20(all.order(yards: :desc).limit(20).pluck(:yards))
        else
            sum_and_average_20(by_position(position).order(yards: :desc).limit(20).pluck(:yards))
        end
    end

    def self.top_20_tds(position = nil)
        if position.nil?
            sum_and_average_20(all.order(touchdowns: :desc).limit(20).pluck(:touchdowns))
        else
            sum_and_average_20(by_position(position).order(touchdowns: :desc).limit(20).pluck(:touchdowns))
        end
    end

    def self.top_20_long(position = nil)
        if position.nil?
            sum_and_average_20(all.order(long: :desc).limit(20).pluck(:long))
        else
            sum_and_average_20(by_position(position).order(long: :desc).limit(20).pluck(:long))
        end
    end

    def self.top_20_rating(position = nil)
        if position.nil?
            sum_and_average_20(all.order(rating: :desc).limit(20).pluck(:rating))
        else
            sum_and_average_20(by_position(position).order(rating: :desc).limit(20).pluck(:rating))
        end
    end

    def self.top_20_interceptions(position = nil)
        if position.nil?
            sum_and_average_20(all.order(interceptions: :desc).limit(20).pluck(:interceptions))
        else
            sum_and_average_20(by_position(position).order(interceptions: :desc).limit(20).pluck(:interceptions))
        end
    end

    def self.top_20_sacked(position = nil)
        if position.nil?
            sum_and_average_20(all.order(sacked: :desc).limit(20).pluck(:sacked))
        else
            sum_and_average_20(by_position(position).order(sacked: :desc).limit(20).pluck(:sacked))
        end
    end

    def self.top_20_yards_per_attempt(position = nil)
        if position.nil?
            sum_and_average_20(where("completions > ?", 100).sort_by{|passing|
                passing.yards_per_attempt.nan? ? 0.0 : passing.yards_per_attempt
            }.reverse.take(20).map{ |passing| 
                passing.yards_per_attempt
            })
        else
            sum_and_average_20(by_position(position).where("completions > ?", 100).sort_by{|passing|
                passing.yards_per_attempt.nan? ? 0.0 : passing.yards_per_attempt
            }.reverse.take(20).map{ |passing| 
                passing.yards_per_attempt
            })
        end
    end

    def self.top_20_completion_percent(position = nil)
        if position.nil?
            sum_and_average_20(where("completions > ?", 100).sort_by { |passing| 
                passing.completion_percent.nan? ? 0.0 : passing.completion_percent
            }.reverse.take(20).map{ |passing| 
                passing.completion_percent
            })
        else
            sum_and_average_20(by_position(position).where("completions > ?", 100).sort_by { |passing| 
                passing.completion_percent.nan? ? 0.0 : passing.completion_percent
            }.reverse.take(20).map{ |passing| 
                passing.completion_percent
            })
        end
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
