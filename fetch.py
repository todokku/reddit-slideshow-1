import urllib.request, json, re, os, pickle
from PIL import Image
from tqdm import tqdm

subreddits = ["earthporn"]
timeranges = ["all"]
iterations = 10


# Load existing files 
try:
    with open('js/data.js', 'r') as f:
        imglist = f.read().replace('var list = ', '')
        imglist = json.loads(imglist)
except:
    imglist = {}

# Load blacklist 
try:
    with open ('blacklist', 'rb') as f:
        blacklist = pickle.load(f)
except:
    blacklist = []

last = ""


for subreddit in subreddits:
    for timerange in timeranges:
        for i in range(iterations):
            tqdm.write("ITERATION " + str(i))
            url = "https://www.reddit.com/r/" + subreddit + "/top/.json?t=" + timerange + "&limit=100"
            if last != "":
                url += "&after=" + last

            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:15.0) Gecko/20100101 Firefox/15.0.1'})

            with urllib.request.urlopen(req) as url:
                data = json.loads(url.read().decode())['data']['children']

                for post in tqdm(data, leave=0):

                    # Name, url
                    name = post['data']['name']
                    url = post['data']['url']
                    last = name

                    # Pass if already exists or in blacklist
                    if name in imglist or name in blacklist:
                        continue

                    # Filter brackets, resolution and author from title
                    title = post['data']['title']
                    title = re.sub(r'\[.*\](.)*', '', title)
                    title = re.sub(r'\{.*\}(.)*', '', title)
                    title = re.sub(r'\(.*\)(.)*', '', title)
                    title = re.sub(r'(\d)+ ?x ?(\d)+(.)*', '', title)
                    title = re.sub(r'(by )*@\w+', '', title)
                    title = re.sub(r'(,|\.) +$', '', title)
                    tqdm.write(title)
                    tqdm.write(url)
                    
                    # Download image
                    try:
                        urllib.request.urlretrieve(url, "img/" + name + ".jpg")
                
                    except:
                        blacklist.append(name)
                        continue

                    # Check image resolution and ratio
                    test = False

                    try:
                        width, height = Image.open("img/" + name + ".jpg").size
                        test = (width >= 1920 and height >= 1080 and width/height > 1)
                        tqdm.write(str(width) + "x" + str(height) + ", ratio " + str(width/height) + " => " + str(test) + "\n")

                    except (KeyboardInterrupt, SystemExit):
                        raise

                    except:
                        test = False

                    if (test == False):
                        blacklist.append(name)
                        os.remove("img/" + name + ".jpg")

                    else:
                        imglist[name] = { 'title': title, 'file': name + ".jpg" }

            # Export image list
            with open('js/data.js', 'w') as f:
                print('var list = ' + json.dumps(imglist), file=f)

            # Save blacklist
            with open('blacklist', 'wb') as f:
                pickle.dump(blacklist, f)