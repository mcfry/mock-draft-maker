# == Schema Information
#
# Table name: draft_record_teams
#
#  id              :uuid             not null, primary key
#  draft_record_id :uuid
#  team_id         :uuid
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class DraftRecordTeam < ApplicationRecord

    belongs_to :draft_record
    belongs_to :team
    has_many :picks, dependent: :destroy
    has_many :players, through: :picks

end
