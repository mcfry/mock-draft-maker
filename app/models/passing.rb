class Passing < ApplicationRecord
    belongs_to :player

    attr_accessor :completion_percent, :yards_per_attempt

    def completion_percent
        (completions.to_f / attempts.to_f).round(2)
    end

    def yards_per_attempt
        (yards.to_f / attempts.to_f).round(2)
    end

    def as_json(options = {})
        super(options).merge(completion_percent: completion_percent, yards_per_attempt: yards_per_attempt)
    end
end
