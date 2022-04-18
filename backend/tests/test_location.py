import os

import pytest


def test_location():
    assert os.path.exists("model/model.h5") == True
