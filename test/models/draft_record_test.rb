# == Schema Information
#
# Table name: draft_records
#
#  id             :uuid             not null, primary key
#  draft_picks    :json
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  speed          :integer
#  needs_vs_value :integer
#  randomness     :integer
#
require "test_helper"

class DraftRecordTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
