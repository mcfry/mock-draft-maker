# == Schema Information
#
# Table name: picks
#
#  id                   :bigint           not null, primary key
#  player_id            :bigint
#  draft_record_team_id :uuid
#  pick_number          :integer          not null
#  created_at           :datetime         not null
#  updated_at           :datetime         not null
#
class Pick < ApplicationRecord
    validates :pick_number, presence: true

    belongs_to :player
    belongs_to :draft_record_team
    has_one :team, through: :draft_record_team
end
