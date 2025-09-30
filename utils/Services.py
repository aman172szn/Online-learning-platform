from time import time
from utils.Audio_processor import *
from utils.Video_processor import *

def process_youtube_video(video_url):
    """
    Perform various services on a YouTube video.

    Args:
        video_url (str): The URL of the YouTube video.

    Returns:
        str: The path to the saved text file or None if processing fails.
    """
    
    result = download_youtube_audio(video_url)
    if result is None:
        print("Error: Failed to download YouTube audio")
        return None
        
    wav_path, title, publish_time = result
    text_path = recognize_and_save_speech(wav_path, title, publish_time)

    return text_path

# Export the function with the name Services for backward compatibility
Services = process_youtube_video
from time import time
from utils.Audio_processor import *
from utils.Video_processor import *

def process_youtube_video(video_url):
    """
    Perform various services on a YouTube video.

    Args:
        video_url (str): The URL of the YouTube video.

    Returns:
        str: The path to the saved text file or None if processing fails.
    """
    
    result = download_youtube_audio(video_url)
    if result is None:
        print("Error: Failed to download YouTube audio")
        return None
        
    wav_path, title, publish_time = result
    text_path = recognize_and_save_speech(wav_path, title, publish_time)

    return text_path

# Export the function with the name Services for backward compatibility
Services = process_youtube_video
