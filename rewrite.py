s = ''
with open('/var/www/html/dist/index.html', 'r', encoding='utf-8')as f:
  for line in f.readlines():
    s += line
with open('/var/www/html/dist/index.html', 'w', encoding='utf-8')as f:
  s = s.replace('static', 'dist/static')
  f.write(s)
print(s)
