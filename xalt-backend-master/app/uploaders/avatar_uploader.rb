# frozen_string_literal: true

class AvatarUploader < CarrierWave::Uploader::Base
  def fog_public
    true
  end

  def extension_allowlist
    %w[jpg jpeg png]
  end

  def store_dir
    "public_folder/#{model.class.to_s.underscore}/avatars/#{model.id}"
  end

  def cache_dir
    'tmp'
  end

  def size_range
    1.byte..25.megabytes
  end
end
