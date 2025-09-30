# Importing necessary libraries
import yt_dlp
import os

def download_youtube_audio(video_url, output_path='./download_audio/'):
    """
    Download audio from a YouTube video and convert it to WAV format using yt-dlp.

    Args:
        video_url (str): The URL of the YouTube video.
        output_path (str): The path where the downloaded audio and converted WAV file will be saved.

    Returns:
        tuple: A tuple containing the path to the saved WAV file, the title of the video, and the upload date-time.
    """
    try:
        # Ensure output directory exists
        os.makedirs(output_path, exist_ok=True)
        
        # Configure yt-dlp options
        ydl_opts = {
            'format': 'bestaudio/best',
            'outtmpl': os.path.join(output_path, '%(title)s.%(ext)s'),
            'postprocessors': [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'wav',
                'preferredquality': '192',
            }],
            'quiet': True,
            'no_warnings': True,
        }
        
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            # Extract video info without downloading
            info = ydl.extract_info(video_url, download=False)
            title = info.get('title', 'unknown')
            upload_date = info.get('upload_date', None)
            
            # Clean title for filename
            clean_title = ''.join(char.lower() for char in title if char.isalnum() or char.isspace())
            
            # Download and convert to WAV
            ydl.download([video_url])
            
            # Find the generated WAV file
            wav_filename = f"{clean_title}.wav"
            wav_path = os.path.join(output_path, wav_filename)
            
            # If the exact filename doesn't exist, look for any .wav file in the directory
            if not os.path.exists(wav_path):
                wav_files = [f for f in os.listdir(output_path) if f.endswith('.wav')]
                if wav_files:
                    wav_path = os.path.join(output_path, wav_files[0])
                else:
                    print("Error: No WAV file found after download")
                    return None
            
            print(f"Audio downloaded and converted successfully: {wav_path}")
            
            # Convert upload_date to datetime if available
            upload_date_time = None
            if upload_date:
                try:
                    from datetime import datetime
                    upload_date_time = datetime.strptime(upload_date, '%Y%m%d')
                except:
                    upload_date_time = None
            
            return wav_path, clean_title, upload_date_time
            
    except Exception as e:
        print(f"Error: {e}")
        return None
