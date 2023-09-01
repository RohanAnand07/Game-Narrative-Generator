from gpt4all import GPT4All
model = GPT4All("orca-mini-3b.ggmlv3.q4_0.bin")
output = model.generate("What is the capital of India? ", max_tokens=5)
print(output)