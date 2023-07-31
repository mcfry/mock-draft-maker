class Receiving < ApplicationRecord
    belongs_to :player

    attr_accessor :average

    def average
        (yards.to_f / receptions.to_f).round(2)
    end

    def as_json(options = {})
        super(options).merge(average: average)
    end
end
