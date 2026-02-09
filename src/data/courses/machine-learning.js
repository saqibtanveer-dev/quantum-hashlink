export const machineLearningCourse = {
  id: "machine-learning",
  title: "Machine Learning",
  syllabus: [
    { week: 1, topics: ["Introduction to Machine Learning: types, use cases, and tools", "Setting up Python environment with `virtualenv` or `conda`", "Loading and exploring datasets with Pandas"] },
    { week: 2, topics: ["Data preprocessing: handling missing values, normalization, and encoding", "Feature engineering basics (one-hot encoding, scaling)", "Train/test split and cross-validation concepts"] },
    { week: 3, topics: ["Supervised learning: linear regression theory and implementation", "Evaluating regression models: MSE, RMSE, MAE", "Visualizing regression results with matplotlib"] },
    { week: 4, topics: ["Classification algorithms: logistic regression and k\u2011nearest neighbors", "Evaluation metrics: accuracy, precision, recall, F1\u2011score", "ROC curve and AUC"] },
    { week: 5, topics: ["Decision trees and random forests", "Overfitting vs. underfitting, pruning strategies", "Feature importance and interpretability"] },
    { week: 6, topics: ["Support Vector Machines (SVMs) and kernel tricks", "Hyperparameter tuning with GridSearchCV and RandomizedSearchCV", "Model selection and cross-validation pipelines"] },
    { week: 7, topics: ["Unsupervised learning: k\u2011means clustering and hierarchical clustering", "Dimensionality reduction with PCA", "t\u2011SNE for visualization"] },
    { week: 8, topics: ["Neural networks introduction: perceptron, activation functions", "Building a simple feedforward neural network with TensorFlow/Keras", "Training, validation, and loss functions"] },
    { week: 9, topics: ["Convolutional Neural Networks (CNNs) basics for image data", "Building a CNN architecture in Keras", "Transfer learning with pre-trained models (e.g., VGG, ResNet)"] },
    { week: 10, topics: ["Recurrent Neural Networks (RNNs) and LSTM for sequence data", "Text preprocessing for NLP tasks", "Sentiment analysis example using LSTM"] },
    { week: 11, topics: ["Model deployment basics: saving/loading models with `joblib` or `pickle`", "Serving a model via Flask or FastAPI", "Containerizing ML apps with Docker"] },
    { week: 12, topics: ["Final project: end-to-end ML pipeline (data ingestion, training, evaluation, deployment)", "Ethical considerations and bias in models", "Next steps: advanced topics (deep learning, reinforcement learning)"] },
  ],
};
