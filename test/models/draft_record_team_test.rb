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
require "test_helper"

class DraftRecordTeamTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
