require "test_helper"

class Api::V1::PlayerControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_player_index_url
    assert_response :success
  end

  test "should get create" do
    get api_v1_player_create_url
    assert_response :success
  end

  test "should get show" do
    get api_v1_player_show_url
    assert_response :success
  end

  test "should get destroy" do
    get api_v1_player_destroy_url
    assert_response :success
  end
end
