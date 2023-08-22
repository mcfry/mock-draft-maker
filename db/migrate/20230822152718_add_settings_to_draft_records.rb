class AddSettingsToDraftRecords < ActiveRecord::Migration[7.0]
  def change
    add_column :draft_records, :speed, :integer
    add_column :draft_records, :needs_vs_value, :integer
    add_column :draft_records, :randomness, :integer
  end
end
