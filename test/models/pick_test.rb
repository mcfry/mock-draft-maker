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
require "test_helper"

class PickTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
