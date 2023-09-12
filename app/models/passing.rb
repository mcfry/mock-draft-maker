# == Schema Information
#
# Table name: passings
#
#  id            :uuid             not null, primary key
#  player_id     :bigint
#  year          :integer
#  attempts      :integer
#  completions   :integer
#  long          :integer
#  yards         :integer
#  touchdowns    :integer
#  interceptions :integer
#  sacked        :integer
#  rating        :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class Passing < ApplicationRecord
    include Top20Creator

    belongs_to :player

    scope :by_position, -> (position) { joins(:player).where({player: {position: position}}) }

    attr_accessor :completion_percent, :yards_per_attempt

    # from Top20Creator - true for plural
    create_top_20(
        yards: { pluralize: true, order_asc: false },
        touchdowns: { pluralize: true, order_asc: false },
        long: { pluralize: false, order_asc: false },
        attempts: { pluralize: true, order_asc: false },
        completions: { pluralize: true, order_asc: false },
        interceptions: { pluralize: true, order_asc: false },
        sacked: { pluralize: false, order_asc: false }
    )

    def completion_percent
        (completions.to_f / attempts.to_f).round(2)
    end

    def yards_per_attempt
        (yards.to_f / attempts.to_f).round(2)
    end

    # Non Standard Top 20s
    def self.top_20_rating(position = nil)
        if position.nil?
            sum_and_average_20(where("completions > ?", 100).sort_by{|passing|
                passing.rating.nan? ? 0.0 : passing.rating
            }.reverse.take(20).map{ |passing| 
                passing.rating
            })
        else
            completionsFilter = 1
            if position == "QB"
                completionsFilter = 100
            end

            sum_and_average_20(by_position(position).where("completions > ?", completionsFilter).sort_by{|passing|
                passing.rating ? 0 : passing.rating
            }.reverse.take(20).map{ |passing| 
                passing.rating
            })
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
            completionsFilter = 1
            if position == "QB"
                completionsFilter = 100
            end

            sum_and_average_20(by_position(position).where("completions > ?", completionsFilter).sort_by{|passing|
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
            completionsFilter = 1
            if position == "QB"
                completionsFilter = 100
            end

            sum_and_average_20(by_position(position).where("completions > ?", completionsFilter).sort_by { |passing| 
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
