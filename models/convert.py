import torch
file = "AestheticPosesFluxDev/aestheticv3.safetensors"

folder = file.split("/")[0]
filename = file.split("/")[1].split(".")[0]

model = torch.load(file)
# Change according to your input shape
# dummy_input = torch.randn(1, 3, 224, 224)
torch.onnx.export(model, (), folder + "/" + filename + '.onnx')
