class MigrateFirebaseToPostgres < ActiveRecord::Migration[6.0]
  def up
    user = User.find_or_create_by(name: 'Xalt Admin', role: 'admin', email: 'admin@xalt.fit')
    user.update(password: 'Xaltadmin123')
    user.confirm unless user.confirmed?

    db = JSON.load(File.open('xalt-firebase-db.json'))

    exercises = []

    ids = %w[0lmxZxIKACbtqKZC61y2eEHifKO2 0qGjhQOuLFUQtlGJwBo0ILUm56W2 26a8J6PuGWR4FdCn3vXvwVVpvEB3 6ug8ZtvPhtNETZYH1ZhoJBO3p9z1 CuiNPsEoFwZeTHj2M4F5lz3u5VJ2 GcQzKsbDDnObUTZeTftvIhVs7LV2 JO5s0roehkWjtfpmZJrRDqV8Y9V2 KuZS3OEr6EgY3sVJmC9dg6Ar7I92 OVPyDnH9QCRhFjsVtYbGZwOPRno1 VSwpRNwy8VZVC7fDtaClqV4TXeT2 X97EIrnicBYqmVQA98CqrZ8kaxq2 XOAzLYl0IAWZ3vJy2DYi2TnY9da2 g4XuT2UlRVYVaQ94flclXKmfrdn1 k71djsPd0TezpekD7ZAh6mycR2Z2 lw6XV3gwbNOdQfmCmgthpACT1uz1 n0cU1oD5Yle2RVCUKPtNZgPson43 uw1ZiGElHzPqfIcIR1xQdyzw9BG2]

    # from 21 to 790 strings
    ids.each do |id|

      exercise = db['exercises'][id].values[0]

      name = exercise['exerciseName']
      name = 'exercise' if name.blank?

      description = exercise['exerciseDescription']
      description = 'description' if description.blank?

      categorie = exercise['typeOfExercise']&.downcase.tr(' ', '_')
      categorie = 'core' if Exercise::CATEGORIES.exclude?(categorie)

      equipment = exercise['equipment']&.downcase.tr(' ', '_')
      equipment = 'no' if equipment.blank? || Exercise::EQUIPMENTS.exclude?(equipment)

      difficulty = exercise['difficulty'].to_s.downcase
      difficulty = 'beginer' if Exercise::DIFFICULTIES.exclude?(difficulty)

      movement = exercise['movementDescription']
      movement = 'movement' if movement.blank?

      pose = 'pose'

      set_up = ''
      set_ups = exercise['setUp']
      set_ups.each { |s| set_up + s + ", " }

      repetitions = exercise['repAmount'].to_i
      repetitions = repetitions = 1 if repetitions == 0

      repetitions_duration = exercise['repetitionsDurations']
      repetitions_duration = 'Duration' if repetitions_duration.blank?

      sets = exercise['sets']
      sets = '1' if sets.blank?

      video_url = exercise['videoUrl']
      video_url = 'https://sample' if video_url.blank?

      pace = exercise['pace']
      pace = 'normal' if Exercise::PACES.exclude?(pace)

      weight_selection = exercise['weightSelection']
      weight_selection = 'weight selection' if weight_selection.blank?

      exercises << Exercise.new(
        name: name,
        description: description,
        categorie: categorie,
        equipment: equipment,
        difficulty: difficulty,
        movement: movement,
        # pose: pose,
        # set_up: set_up,
        # repetitions: repetitions,
        # repetitions_duration: repetitions_duration,
        # sets: sets,
        video_url: video_url,
        # pace: pace,
        # weight_selection: weight_selection,
        user: user,
        is_private: false
      )
    end

    # from 790 to 5787 strings
    db['exercises']['zzACliD8f7OQBTrdm7cGC2YuTXu1'].each do |ex|

      exercise = ex[1]

      name = exercise['exerciseName']
      name = 'exercise' if name.blank?

      description = exercise['exerciseDescription']
      description = 'description' if description.blank?

      categorie = exercise['typeOfExercise']&.downcase.tr(' ', '_')
      categorie = 'core' if Exercise::CATEGORIES.exclude?(categorie)

      equipment = exercise['equipment']&.downcase&.tr(' ', '_')
      equipment = 'no' if equipment.blank? || Exercise::EQUIPMENTS.exclude?(equipment)

      difficulty = exercise['difficulty'].to_s.downcase
      difficulty = 'beginer' if Exercise::DIFFICULTIES.exclude?(difficulty)

      movement = exercise['movementDescription']
      movement = 'movement' if movement.blank?

      pose = 'pose'

      set_up = ''
      set_ups = exercise['setUp']
      if set_ups.kind_of?(Array)
        set_ups.each { |s| set_up + s + ", " }
      else
        set_up = set_ups
      end
      set_up = '' if set_up.blank?


      repetitions = exercise['repAmount'].to_i
      repetitions = repetitions = 1 if repetitions == 0

      repetitions_duration = exercise['repetitionsDurations']
      repetitions_duration = 'Duration' if repetitions_duration.blank?

      sets = exercise['sets']
      sets = '1' if sets.blank?

      video_url = exercise['videoUrl']
      video_url = 'https://sample' if video_url.blank?

      pace = exercise['pace']
      pace = 'normal' if Exercise::PACES.exclude?(pace)

      weight_selection = exercise['weightSelection']
      weight_selection = 'weight selection' if weight_selection.blank?

      exercises << Exercise.new(
        name: name,
        description: description,
        categorie: categorie,
        equipment: equipment,
        difficulty: difficulty,
        movement: movement,
        # pose: pose,
        # set_up: set_up,
        # repetitions: repetitions,
        # repetitions_duration: repetitions_duration,
        # sets: sets,
        video_url: video_url,
        # pace: pace,
        # weight_selection: weight_selection,
        user: user,
        is_private: false
      )
    end

    exercises.each { |ex| ex.save! }
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
