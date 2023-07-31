class Receiving < ApplicationRecord
    belongs_to :player

    attr_accessor :average

    def average
        yards / receptions
    end
end
