# == Schema Information
#
# Table name: picks
#
#  id          :bigint           not null, primary key
#  team_id     :bigint
#  player_id   :bigint
#  year        :integer          not null
#  round       :integer          not null
#  pick_number :integer          not null
#  from        :string           default("Original")
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Pick < ApplicationRecord
    validates :year, presence: true
    validates :round, presence: true
    validates :pick_number, presence: true
    validates :from, presence: true

    belongs_to :team
    belongs_to :player
end
