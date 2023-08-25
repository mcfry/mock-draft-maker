# == Schema Information
#
# Table name: passings
#
#  id            :uuid             not null, primary key
#  player_id     :bigint
#  year          :integer
#  attempts      :integer
#  completions   :integer
#  long          :integer
#  yards         :integer
#  touchdowns    :integer
#  interceptions :integer
#  sacked        :integer
#  rating        :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
require "test_helper"

class PassingTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
