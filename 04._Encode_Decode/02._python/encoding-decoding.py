import base64

fixed_string = "HelloWorld123"

encoded = base64.b64encode(fixed_string.encode()).decode()
decoded = base64.b64decode(encoded).decode()

print("Original:", fixed_string)
print("Encoded:", encoded)
print("Decoded:", decoded)
