class Defense < ApplicationRecord
    belongs_to :player

    attr_accessor :total

    def total
        solo + assisted
    end

    def as_json(options = {})
        super(options).merge(total: total)
    end
end
