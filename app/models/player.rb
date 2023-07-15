class Player < ApplicationRecord
    validates :first, presence: true
    validates :last, presence: true
    validates :position, presence: true

    has_many :picks
    has_many :teams, through: :picks
end
