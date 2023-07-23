class CreateDraftRecords < ActiveRecord::Migration[7.0]
  def change
    create_table :draft_records, id: false do |t|
      t.string :uuid, primary_key: true
      t.json :draft_picks

      t.timestamps
    end
  end
end
