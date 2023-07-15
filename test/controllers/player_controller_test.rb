require "test_helper"

class PlayerControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get player_index_url
    assert_response :success
  end

  test "should get create" do
    get player_create_url
    assert_response :success
  end

  test "should get show" do
    get player_show_url
    assert_response :success
  end

  test "should get destroy" do
    get player_destroy_url
    assert_response :success
  end
end
