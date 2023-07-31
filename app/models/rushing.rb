class Rushing < ApplicationRecord
    belongs_to :player

    attr_accessor :average

    def average
        (yards.to_f / attempts.to_f).round(2)
    end

    def as_json(options = {})
        super(options).merge(average: average)
    end
end
