class Rushing < ApplicationRecord
    belongs_to :player

    attr_accessor :average

    def average
        yards / attempts
    end
end
