class Passing < ApplicationRecord
    belongs_to :player

    attr_accessor :completion_percent, :yards_per_attempt

    def completion_percent
        completions / attempts
    end

    def yards_per_attempt
        yards / attempts
    end
end
