class CreateDraftRecords < ActiveRecord::Migration[7.0]
  def change
    create_table :draft_records, id: :uuid do |t|
      t.json :draft_picks

      t.timestamps
    end
  end
end
