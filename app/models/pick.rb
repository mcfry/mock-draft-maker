class Pick < ApplicationRecord
    validates :year, presence: true
    validates :round, presence: true
    validates :pick_number, presence: true
    validates :from, presence: true

    belongs_to :team
    belongs_to :player
end
